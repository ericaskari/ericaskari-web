import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { dropDownAnimation } from './dropdown.animation';
import { ClickService } from '../../services/click.service';

export interface LangSelectorOption {
    name: string;
    value: string | null;
    flag: string;
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

    @Input() selectedValue: string | null = 'EN';

    @Input() options: LangSelectorOption[] = [
        { disabled: false, name: 'Finnish', value: 'fi', flag: 'bg-flag-finland' },
        { disabled: false, name: 'English', value: 'en', flag: 'bg-flag-england' },
        { disabled: true, name: 'Farsi', value: 'fa', flag: 'bg-flag-iran' }
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

    getSelectedFlag(): string {
        if (this.selectedValue === null) {
            return '';
        }

        return this.getOptions().find((x) => x.value === this.selectedValue)?.flag ?? '';
    }

    getFlagClassName(): Record<string, boolean> {
        if (this.selectedValue === null) {
            return {};
        }
        const selected = this.getOptions().find((x) => x.value === this.selectedValue);
        if (selected) {
            return {
                [selected.flag]: true
            };
        } else return {};
    }

    getOptionFlagClassName(opt: LangSelectorOption): Record<string, boolean> {
        return {
            [opt.flag]: true
        };
    }

    getOptions(): LangSelectorOption[] {
        return this.options.filter((x) => !x.disabled);
    }

    onOptionClick(option: LangSelectorOption) {
        this.valueChanged.emit(option);
        this.expanded = false;
    }
}
