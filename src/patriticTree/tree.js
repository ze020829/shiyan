class leaf{//将Branch节点的value改成地址就可以了
constructor(keyEnd){
this.keyEnd=keyEnd//这里value不能一开始就定下来，所以不能在constructor里面设value
}

setValue(value){
this.value=value
}

speakValue(){
    console.log(this.value)
}

}


class Branch{
    constructor(){
        for(let i=0x0;i<0xf;i++){
            this.arr[i]=null
        }

    }
addValue(value){
    if(value!=null){
        this.value=value
    }
}
addKey(node,iterator){//传入不定数目的参数
        this.arr[iterator]=node
}
speakValue(){
    console.log(this.value)
}
}

class createMPT{
constructor(rootValue){
    this.rootValue=rootValue
this.root=new leaf(rootValue)
let Branch0=new Branch()
root.setValue(Branch0)
}

addBranch(...args){
let br=new Branch()
br.addKey(...args)
}

addLeaf(key,value){
let l=new leaf(key,value)
}
//最后一个leaf可以长达四个字符，该方法要保证前两个字符和我们预定的字符一样
create(...longStirng){

    if(longStirng[0]+longStirng[1]!=this.rootValue||longStirng.length!=7){
        throw new Error("incrrorct first value")
    }
    
  if(this.Branch0[longStirng[2]]==null){
    let sp=longStirng.slice(3,longStirng.length-1)
    let sum
    for (const iterator of sp) {
        sum+=iterator
    }
    let leaf1=new leaf(sum)
    this.Branch0.addKey(leaf1,longStirng[2])

  }else{
    let ext0=new leaf(longStirng[3]+longStirng[4])
    let ext1=new leaf(longStirng[3]+longStirng[4])

    this.Branch0.addKey(ext0,longStirng[2])
    this.Branch1.addKey(ext1,longStirng[2])

  }


}

}
