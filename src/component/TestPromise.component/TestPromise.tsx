import PromiseP from '../../util/promise';

export default function TestPromise() {
    const p = new PromiseP((resolve, reject) => {
        setTimeout(() => {
            resolve('promiseP');
        }, 2000)
    });
    p.then(async (data) => {
        console.log(data)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('2000');
            }, 2000)
        })
        return data + '👋';
    }).then(console.log);
    (window as any).p = p;
    return <>测试promise的</>
}