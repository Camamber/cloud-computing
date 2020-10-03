let labs = [];
let id = 1

class Lab {
    constructor(name, subject_name, filename) {
        this.id = id++;
        this.name = name;
        this.subject_name = subject_name;
        this.filename = filename
        this.created_at = Date.now()
    }

    save() {
        const index = labs.findIndex(lab => lab.id == id);
        if(index >= 0) {
            labs[index] = this
        }
        labs.push(this)
    }

    static delete(id) {
        labs = labs.filter(lab => lab.id != id);
    }

    static all() {
        return labs;
    }

    static find(id) {
        return labs.find(lab => lab.id == id);
    }

}

module.exports = Lab;