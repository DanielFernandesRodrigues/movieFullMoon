import { SelectItem } from "primeng/primeng";

export class MultiSelectLabels {
    constructor() {}

    multiselectInitialResolve(selectedValues: SelectItem[], defaultText: string, maxItems: number = 3): any {
        var result: string = defaultText;
        if (selectedValues && selectedValues.length > 0) {
            if (selectedValues.length > maxItems) {
                result = selectedValues.length + " Selecionadas";
            } else {
                result = this.resolveInitials(selectedValues);
            }
            return result;
        }
        return false;
    }



    /** resolveInitials()
     * --------------------------------
     * @param selectedValuesn :SelectItem[] \\ selected items in multiselect component
     * @param useLabel :boolean \\ control to verify if label is present
     * @returns :string \\ return string
     * 
     */
    resolveInitials(selectedValues: SelectItem[], useLabel: boolean = false): string {
        var result: string = "";
        for (var i: number = 0; i < selectedValues.length; i++) {
            var el: any = selectedValues[i];
            if (useLabel && el.label){
                result += el.label;
            }else{
                result += el.initials ? el.initials : (el.label ? el.label : "-");
            }
            if ((i + 1) != selectedValues.length)
                result += ", ";
        }
                
        return result;
    }
}