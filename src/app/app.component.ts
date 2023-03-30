import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DemoDirective } from './demo.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  demotext !:string;
  title = 'formteam';
  @ViewChild(DemoDirective)
  set appDemo(dir : DemoDirective){
    this.demotext = dir.demo;
  }

  ngAfterViewInit(){
    console.log(this.demotext);
  }
}
