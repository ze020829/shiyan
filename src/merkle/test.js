let wk=[]
wk.push(new UTXO('fe','aw',50))
wk.push(new UTXO('fagew','aww',50))
wk.push(new UTXO('fehx','awfe',50))
wk.push(new UTXO('fefr4','jtdaw',50))


let mk=new merkel()
console.log(mk.comeout(wk))
