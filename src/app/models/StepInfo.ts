export class StepInfo {
    steps: number;
    datetime: Date;

    constructor(steps?: number, datetime?: Date) {
        this.steps = steps;
        this.datetime = datetime;
    }
} 