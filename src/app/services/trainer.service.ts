import { Trainer } from './synaptic.service';

export class TrainerService {

    train( network, trainingSet, rate, iterations, minimumError, costFunction ): void {
        var trainer = new Trainer(network);

        var a = trainer.train(trainingSet, {
            rate: rate,
            iterations: iterations,
            error: minimumError,
            cost: Trainer.cost.costFunction
        });
        console.log("train complete!");  
    }
}
