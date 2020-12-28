import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule} from '@angular/material/menu';


const modules = [
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
];


@NgModule({
    imports: [...modules],
    exports: [...modules]

})

export class MaterialModule {}