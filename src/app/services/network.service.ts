import { Neuron } from './synaptic.service';
import { Layer } from './synaptic.service';
import { Network } from './synaptic.service';


export class NetworkService {
    
    initNetwork( inputNeuron, hiddenNeuron, outputNeuron ): any {
        var inputLayer = new Layer(inputNeuron);
        var hiddenLayer = new Layer(hiddenNeuron);
        var outputLayer = new Layer(outputNeuron);

        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        var initialNetwork = new Network({
            input: inputLayer,
            hidden: [ hiddenLayer ],
            output: outputLayer
        });

        return initialNetwork;
    }

    buildNetwork( input, hidden, output ): any {
        var inputLayer = new Layer(input.length);
        var hiddenLayers = [];
        for( let i in hidden ) {
            hiddenLayers.push( new Layer(hidden[i].length) );
        }         
        var outputLayer = new Layer(output.length);

        inputLayer.project(hiddenLayers[0]);
        for( let layer in hiddenLayers ) {
            var i = +layer;
            if( i < hiddenLayers.length-1 ) {
                hiddenLayers[i].project(hiddenLayers[i+1]);
            }
        }
        hiddenLayers[hiddenLayers.length-1].project(outputLayer);

        var myNetwork = new Network({
            input: inputLayer,
            hidden: hiddenLayers,
            output: outputLayer
        });

        return myNetwork;
    }


    addHiddenLayer( hiddenLayers ): void {
        var layer = new Layer(1);
        hiddenLayers.push( layer.neurons() );
    }

    removeHiddenLayer( hiddenLayers ): void {
        hiddenLayers.pop();
    }    

    addNeuron( neurons ): void {
        neurons.push( new Neuron() );            
    } 

    removeNeuron( neurons ): void {
        neurons.pop();
    }
}