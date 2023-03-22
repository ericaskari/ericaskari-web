import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { dropDownAnimation } from './dropdown.animation';
import { ClickService } from '../../services/click.service';

export interface LangSelectorOption {
    name: string;
    value: string | null;
    disabled: boolean;
}

@Component({
    selector: 'app-lang-selector',
    templateUrl: './lang-selector.component.html',
    styleUrls: ['./lang-selector.component.scss'],
    providers: [],
    animations: [dropDownAnimation]
})
export class LangSelectorComponent {
    @ViewChild('dropdown', { read: ElementRef, static: false }) dropdown: ElementRef | undefined = undefined;

    @Input() selectedValue: string = 'en';

    @Input() options: LangSelectorOption[] = [
        { disabled: false, name: 'languages.finnish', value: 'fi' },
        { disabled: false, name: 'languages.english', value: 'en' },
        { disabled: true, name: 'languages.persian', value: 'fa' }
    ];

    @Input() label: string = '';

    @Output() valueChanged = new EventEmitter<LangSelectorOption>();

    expanded = false;

    hideProfilePopupOnCLickOutside$ = this.clickService.documentClickedTarget.pipe(
        tap((x) => {
            if (this.dropdown?.nativeElement.contains(x)) return;
            this.expanded = false;
        })
    );

    constructor(private clickService: ClickService) {}

    get getSelectedFlag(): string {
        if (this.selectedValue === null) {
            return '';
        }

        return this.getOptions().find((x) => x.value === this.selectedValue)?.name ?? '';
    }

    getOptions(): LangSelectorOption[] {
        return this.options.filter((x) => !x.disabled);
    }

    onOptionClick(option: LangSelectorOption) {
        this.valueChanged.emit(option);
        this.expanded = false;
    }
}
