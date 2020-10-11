import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthguardService } from './services/authguard.service';
import { GlobalService } from './services/global.service';
import { CollapseMenuComponent } from './components/collapse-menu/collapse-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftPannelComponent } from './components/left-pannel/left-pannel.component';
import { RightPannelComponent } from './components/right-pannel/right-pannel.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { BodySectionComponent } from './components/body-section/body-section.component';
import { ComposeMailComponent } from './components/compose-mail/compose-mail.component';
import { MailComponent } from './components/mail/mail.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { TrashMailComponent } from './components/trash-mail/trash-mail.component';
import { DraftMailComponent } from './components/draft-mail/draft-mail.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchContainerComponent } from './components/search-container/search-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CollapseMenuComponent,
    HeaderComponent,
    LeftPannelComponent,
    RightPannelComponent,
    UserDetailComponent,
    BodySectionComponent,
    ComposeMailComponent,
    MailComponent,
    SendMailComponent,
    TrashMailComponent,
    DraftMailComponent,
    SearchPipe,
    SearchContainerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthguardService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
