export class Document {
    public id: string;
    public name: string;
    public desc: string;
    public docUrl: string;
    public children: Document[];
   
    constructor(id: string, name: string, desc: string, docUrl: string, children: Document[]) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.docUrl = docUrl;
        this.children = children;
    }
}