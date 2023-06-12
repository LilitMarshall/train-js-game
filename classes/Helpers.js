export default class Helpers {
    static random(min, max){
        return (Math.floor(Math.random()*(max-min+1))+min)
    }
    static timeout(delay, func, arg){
        return new Promise((resolve, reject)=>{
           setTimeout(() => { resolve(func(arg)) }, delay)
        })
    }
}