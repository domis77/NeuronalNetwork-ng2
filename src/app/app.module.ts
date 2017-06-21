import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//#components
import { AppComponent }  from './app.component';
import { Network } from './network.component';
import { Trainer } from './trainer.component';

import { BsDropdownModule } from 'ngx-bootstrap';

//#services
import { NetworkService } from './services/network.service';
import { TrainerService } from './services/trainer.service';


@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    BsDropdownModule.forRoot() 
  ],
  declarations: [ 
    AppComponent, 
    Network,
    Trainer
  ],
  providers: [
     NetworkService,
     TrainerService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
