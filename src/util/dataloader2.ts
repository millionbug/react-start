/**
  *一个接受 ids 然后返回结果的函数handle，
 * 对这个handle进行封装，返回一个loader
 * 每次通过调用loader来调用handle
 * 每接收到一个对loader的调用
 * 就存储起来，并不立即执行handle
 * 而是收集loader的参数id，并且将多个id合并为ids
 * 最后在js执行的末尾，调用一次handle(ids)这样
 *
 * @export
 * @param {(id: number) => {}} handle
 */
export default function Dataloader<T>(handle: (ids: number[]) => Promise<T[]>) {
    const cachesMap = {};
    const loader = {
        cacheIdsQue: [] as {id: number; resolve: Function; reject: Function}[],
        load: function (id: number) {
            const quePromise = new Promise((resolve, reject) => {
                this.cacheIdsQue.push({
                    id,
                    resolve,
                    reject
                });
                if (this.cacheIdsQue.length === 1) {
                    this.nextTickRun();
                }
            })
            return quePromise;
        },
        nextTickRun() {
            Promise.resolve().then(() => {
                if (this.cacheIdsQue.length) {
                    const cacheIdsQue = this.cacheIdsQue;
                    const results = handle(this.cacheIdsQue.map(ref => ref.id));
                    results.then((values) => {
                        values.forEach((element, index) => {
                            cacheIdsQue[index].resolve(element);
                        });
                        this.clearQue();
                    })
                }
            });
        },
        clearQue() {
            this.cacheIdsQue = [];
        }
    }
    return loader;
}

