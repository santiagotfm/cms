export class Document {
    public id: number;
    public name: string;
    public desc: string;
    public docUrl: string;
    public children: string;
   
    constructor(id: number, name: string, desc: string, docUrl: string, children: string) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.docUrl = docUrl;
        this.children = children;
    }
}