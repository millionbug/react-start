export default class PromiseP<T> {
    data: any;
    status: 'pending' | 'fulfilled' | 'rejected' = 'pending';

    name = '第一'

    handlesQue: ((data: any) => any)[] = [];

    constructor(producer?: (resolve: Function, reject: Function) => any) {
        producer && producer(this.resolveFn, this.rejectFn);
    }

    resolveFn = (data: any) => {
        this.data = data;
        this.status = 'fulfilled';
        this.handlesQue.forEach(h => {
            this.excute(h);
        });
        this.clearHandlesQue();
        return this;
    }

    rejectFn = (data: any) => {
        this.data = data;
        this.status = 'rejected';
        return this;
    }

    then(hanlde: (data: any) => any) {
        if (this.status === 'fulfilled' || this.status === 'rejected') {
            return this.excute(hanlde);
        }
        this.handlesQue.push(hanlde);
        const p = new PromiseP();
        p.status = 'pending';
        p.name = '第二';
        // 这个 p 的resolve后的回调也需要注入到当前promise的handleque中
        this.handlesQue.push(p.resolveFn.bind(p));
        return p;
    }

    excute(hanlde: (data: any) => any) {
        try {
            const result = hanlde(this.data);
            const p = new PromiseP();
            p.data = result;
            p.status = 'fulfilled';
            return p;
        } catch (error) {
            const p = new PromiseP();
            p.data = error;
            p.status = 'rejected';
            return p;
        }
    }
    clearHandlesQue() {
        this.handlesQue = [];
    }
}