export class StepInfo {
    
    datetime: Date;
    stepAccumulated: number;

    constructor( datetime?: Date, stepAccumulated?: number) {
        this.datetime = datetime;
        this.stepAccumulated = stepAccumulated;
        
    }
} 