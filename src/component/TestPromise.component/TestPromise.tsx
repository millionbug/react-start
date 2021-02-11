import PromiseP from '../../util/promise';

export default function TestPromise() {
    const p = new PromiseP((resolve, reject) => {
        setTimeout(() => {
            resolve('promiseP');
        }, 2000)
    });
    p.then((data) => {
        console.log(data)
        return data + '👋';
    }).then(data => {
        console.log(data)
        return data + '💐';
    }).then(data => {
        console.log(data)
        return data + '🐶';
    });
    p.then((data) => {
        console.log(data)
        return data + '123';
    }).then((data) => {
        console.log(data)
    });
    (window as any).p = p;
    return <>测试promise的</>
}