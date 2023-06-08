import MerkleTree from "./merkle.js"

var arr = ["1","2","3","4","5","6","7","8"]
console.log(`use the array to init the merkleTree: [${arr}]`)
var merkletree = new MerkleTree(arr)
console.log(`merkleTree's rootHash: ${merkletree.merkleTree()}`)
console.log("merkleTree's details are as follows:")
console.log(merkletree.hashArray)
var arrVerify = ["6a9a98aeb38be37ce667c1fc90785125a1502bd0df1ab2eb6ebd40d6bfdb300f",
    "80528851f07939e927fc6fa72ad571434f48c06bd020bad8a44e9e66a652b829",
    "ddd9feba0ac3052b9600ef7dff697b2d3fc7a3bc5fdbfd66707a18e48256bf57",
    "060923094e1c4d0793261648435dea1ac7d9a337358f97db516eb0349aca74b8"]
console.log(`whether the hash'${arrVerify[0]}' in the merkleTree or not: ${merkletree.verify(arrVerify)}`)