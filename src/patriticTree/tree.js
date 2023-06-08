class MPT {
    constructor() {
        this.root = null;
        this.data = {};
    }


    addOrUpdateAddress(address, balance) {
        const key = this.getAddressKey(address);
        this.data[key] = balance;
        this.root = null; // 标记根节点需要重新计算
    }

    getAddressKey(address) {
        const hash = keccak256(address); // 使用keccak256进行哈希计算
        return '0x' + hash.toString('hex');
    }

    calculateRoot() {
        if (this.root === null) {
            const keys = Object.keys(this.data).sort();
            const leaves = keys.map(key => ({ key, value: this.data[key] }));
            this.root = this.buildMerkleTree(leaves);
        }
        return this.root;
    }

    buildMerkleTree(nodes) {
        if (nodes.length === 0) {
            return null;
        }

        if (nodes.length === 1) {
            return this.hashNode(nodes[0]);
        }

        const nextLevelNodes = [];
        for (let i = 0; i < nodes.length; i += 2) {
            const left = nodes[i];
            const right = i + 1 < nodes.length ? nodes[i + 1] : null;
            const parentNode = this.hashNode(left, right);
            nextLevelNodes.push(parentNode);
        }

        return this.buildMerkleTree(nextLevelNodes);
    }

    hashNode(left, right = null) {
        if (right === null) {
            return left;
        }

        const hashInput = left.key + left.value + right.key + right.value;
        const hash = keccak256(hashInput);
        const node = { key: '0x' + hash.toString('hex') };
        return node;
    }

    verifyAddressBalance(address, balance) {
        const key = this.getAddressKey(address);
        return this.data[key] === balance;
    }
}

// 示例用法
const mpt = new MPT();
mpt.addOrUpdateAddress('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 100);
mpt.addOrUpdateAddress('0x1a5e3c819b61563cfc2f5b6d9b2e169a0d1e0609', 200);

const root = mpt.calculateRoot();
console.log('Root:', root);

console.log('Verify Address 1:', mpt.verifyAddressBalance('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 100));
console.log('Verify Address 2:', mpt.verifyAddressBalance('0x1a5e3c819b61563cfc2f5b6d9b2e169a0d1e0609', 200));

//更新地址余额
mpt.addOrUpdateAddress('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 300);
console.log('Verify Address 1:', mpt.verifyAddressBalance('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 300));

//查看根节点
const root2 = mpt.calculateRoot();
console.log('Root:', root2);




