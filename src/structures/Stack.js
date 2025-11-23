export class Stack {
    constructor(limit = 10) {
        this.items = [];
        this.limit = limit;
    }

    push(item) {
        this.items.push(item);
        if (this.items.length > this.limit) this.items.shift();
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    toArray() {
        return [...this.items].reverse();
    }

    size() {
        return this.items.length;
    }
}
