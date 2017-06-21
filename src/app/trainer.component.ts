import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { TrainerService } from './services/trainer.service';

import { BsDropdownModule } from 'ngx-bootstrap';

interface trainingSet {
    input: number[];
    output: number[];
}

@Component({
    selector: 'trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./css/trainer.component.css']
})


export class Trainer implements OnInit {
    constructor( private trainerService: TrainerService ) {}

    @Input() inputNeurons: Object[]; 
    @Input() outputNeurons: Object[];  
    @Input() network: any; 
    @Output() rebuildNetwork = new EventEmitter();

    private trainingSet: any[] = [{ input: [], output: [] }];
    private learningRate: number = .3;
    private iterations: number = 2000;
    private minimumError: number = .005;
    private costFunction: string = "CROSS_ENTROPY";


    ngOnInit(): void {     
    }

    addTrainingSet(): void {
        this.trainingSet.push({ input: [], output: [] });
    }
    
    removeTrainingSet(): void {
        this.trainingSet.pop();        
    }

    setCostFunction(costFunction): void {
        this.costFunction = costFunction;        
    }

    trainNetwork(): void {
        this.rebuildNetwork.emit();
        this.trainerService.train( this.network, this.trainingSet, this.learningRate, this.iterations, this.minimumError, this.costFunction );
    }
}