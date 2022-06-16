import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faBan } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class IconsModule {

  constructor(private library: FaIconLibrary) {
    const list: any = [
    faPlus,
    faEdit,
    faBan
  ];
    library.addIcons(...list);
  }

}
