export class Employer {
    matBoss?: string;
    fnameBoss?: string;
    lnameBoss?: string;
    passBoss?: string;
    daysLeft?:number ;
  
    constructor(matBoss?: string, fnameBoss?: string, lnameBoss?: string, passBoss?: string,daysLeft?:number) {
      this.matBoss = matBoss;
      this.fnameBoss = fnameBoss;
      this.lnameBoss = lnameBoss;
      this.daysLeft= daysLeft;
      this.passBoss = passBoss;
      
    }
  }
  // {matBoss: 'B42012', fnameBoss: 'imed', lnameBoss: 'habib', passBoss: 'hab111bib', daysLeft: 30}