export class BpmInfo {
    bpm: number;
    datetime: Date;

    constructor(bpm?: number, datetime?: Date) {
        this.bpm = bpm;
        this.datetime = datetime;
    }
} 