class Node{
    constructor(value) {
        this.value = value
        this.isEndOfWord = false
        this.children = {}
        this.wordCount = 0 // record the repeat times of word
    }
}

class Trie{
    constructor(){
        this.root = new Node(null)
    }

    insert(word){
        let current = this.root
        // iterate through all the characters of word
        for(let character of word){
            // if node doesn't have the current character as child, insert it
            if(current.children[character] === undefined){
                current.children[character] = new Node(character)
            }
            // move down, to insert next character
            current.children[character].wordCount++
            current = current.children[character]
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true
    }

    search(word){
        let current = this.root
        // iterate through all the characters of word
        for(let character of word){
            if(current.children[character] === undefined){
                // could not find this character in sequence, return false
                return false
            }
            // move down, to match next character
            current = current.children[character]
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord
    }

    delete(word){
        var len = Object.keys(this.root.children).length
        if(len == 0){
            console.log("there is no word in trie")
            return
        }
        let current = this.root
        var num = 0
        // iterate through all the characters of word
        for(let character of word){
            // minus one for each node if it doesn't be deleted
            if (current.wordCount != 0){
                current.wordCount--
            }
            // if the repeat times of word is only one ,it means that the word should be deleted
            if(current.children[character].wordCount == 1 && current.children[character].value == word[num]){
                delete current.children[character]
                return
            }
            current = current.children[character]
            num++
        }
    }
}

export default Trie