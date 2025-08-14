import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private _templateRef = inject(TemplateRef);
  private _viewContainer = inject(ViewContainerRef);
  private _userService = inject(UserService);
  roles = input.required<string[]>({ alias: 'hasRole' });

  userEffect = effect(() => {
    this._viewContainer.clear();
    if (this.roles().some(role => this._userService.getRoles().includes(role))) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  });


}
