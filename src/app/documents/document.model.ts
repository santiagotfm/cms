export class Document {
    public id: string;
    public name: string;
    public desc: string;
    public url: string;
    public children: Document[];
   
    constructor(id: string, name: string, desc: string, url: string, children: Document[]) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.url = url;
        this.children = children;
    }
}