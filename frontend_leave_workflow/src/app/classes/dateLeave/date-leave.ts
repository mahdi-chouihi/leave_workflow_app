export class DateLeave {
    startLeave?:Date;
    endLeave?:Date;
    creationDate?:Date;
    daysLeft?: number;
    matEmp?: string;
    fnameEmp?: string;
    lnameEmp?: string;
    matBoss?: string |null;
    leaveStatus?:string;
    // id?:number;

    constructor(
        startLeave?: Date,
        endLeave?: Date,
        creationDate?: Date,
        daysLeft?: number,
        matEmp?: string,
        fnameEmp?: string,
        lnameEmp?: string,
        matBoss?: string |null,
        leaveStatus?:string,
        // id?:number
    ) {
        this.startLeave = startLeave;
        this.endLeave = endLeave;
        this.creationDate = creationDate;
        this.daysLeft = daysLeft;
        this.matEmp = matEmp;
        this.fnameEmp = fnameEmp;
        this.lnameEmp = lnameEmp;
        this.matBoss = matBoss;
        this.leaveStatus=leaveStatus;
        // this.id=id;
    }
}

 