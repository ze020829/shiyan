import Trie from "./trieTree.js"


const trie = new Trie();
trie.insert("CUIT");
trie.insert("slz");
console.log(trie.search("CUIT")) // true
console.log(trie.search("slz")) // false
trie.delete("CUIT")
console.log(trie.search("CUIT")) // false
console.log(trie.search("slz")) // true
trie.delete("slz")
console.log(trie.search("slz")) // false
trie.delete("nothing") // `there is no word in trie`
trie.insert("CUIT");
console.log(trie.search("CUIT")) // true