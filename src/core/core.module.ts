import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiKeyService } from './services/api-key.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [ApiKeyService]
})
export class CoreModule { }