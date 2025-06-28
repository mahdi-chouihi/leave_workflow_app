export class Employee {
    matEmp?: string;
    fnameEmp?: string;
    lnameEmp?: string;
    passEmp?: string;
    matBoss?: string;
    daysLeft?:number ;

    constructor(matEmp?: string,fnameEmp?: string, lnameEmp?: string, passEmp?: string,matBoss?: string ,daysLeft?:number) {
        this.matEmp = matEmp;
        this.fnameEmp= fnameEmp;
        this.lnameEmp = lnameEmp;
        this.passEmp = passEmp;
        this.matBoss = matBoss;
        this.daysLeft=daysLeft;
      }
}

// Employee(matEmp=E51999, fnameEmp=fatma, lnameEmp=charfeddine, passEmp=lavieenmauve, matBoss=B52015, daysLeft=30)