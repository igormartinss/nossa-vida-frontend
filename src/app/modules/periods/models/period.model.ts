
export class Period {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;

    constructor(id?: number,title?: string, startDate?: string, endDate?: string, description?: string) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        if(id){
            this.id = id;
        }
    }
}