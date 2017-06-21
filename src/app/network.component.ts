import { Component, OnInit } from '@angular/core';

import { Trainer } from './trainer.component';

import { NetworkService } from './services/network.service';


@Component({
    selector: 'my-network',
    templateUrl: './network.component.html',
    styleUrls: ['./css/network.component.css'],
})


export class Network implements OnInit {
    constructor( private networkService: NetworkService ) {}

    network: any;

    inputNeurons: Object[];
    hiddenLayers: Object[][];
    outputNeurons: Object[];

    private isChange: boolean;

    private inputs: number[] = [];
    private outputs: number[] = [];
    

    ngOnInit(): void {
        this.network = this.networkService.initNetwork(2,2,2);
        this.refreshNetworkProperties();
    }

    refreshNetworkProperties(): void {
        var inputLayer = this.network.layers.input;
        this.inputNeurons = inputLayer.neurons();

        var outputLayer = this.network.layers.output;
        this.outputNeurons = outputLayer.neurons(); 

        var hiddenLayers = this.network.layers.hidden;        
        this.hiddenLayers = [];      
        for( let layer of hiddenLayers ) {
            this.hiddenLayers.push(
                layer.neurons()
            )
        }
        this.isChange = false;
    }

    rebuildNetwork(): void {
        if( this.isChange ) {
            this.network = this.networkService.buildNetwork( this.inputNeurons, this.hiddenLayers, this.outputNeurons );
            this.refreshNetworkProperties();
        } 
    }


    addHiddenLayer(): void {
        this.networkService.addHiddenLayer( this.hiddenLayers );
        this.isChange = true;
    }
    removeHiddenLayer(): void { 
        this.networkService.removeHiddenLayer( this.hiddenLayers );    
        this.isChange = true;        
    }
    
    addNeuron( neuronsOfLayer, index ): void {
        this.networkService.addNeuron( neuronsOfLayer );    
        this.isChange = true;                      
    }
    removeNeuron( neuronsOfLayer, index ): void {
        this.networkService.removeNeuron( neuronsOfLayer );     
        this.isChange = true;           
    }


    
    activateNetwork(): void {   
        this.rebuildNetwork();   

        for( let inp in this.inputs)  {
            if( ""+this.inputs[inp] == "" ) {
                this.inputs.splice( +inp, 1 );
            }
        }

        this.outputs = this.network.activate( this.inputs ); 
    }
}
