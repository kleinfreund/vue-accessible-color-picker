import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { default as default_2 } from 'colorjs.io';
import { DefineComponent } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<ColorPickerProps, {
copyColor: typeof copyColor;
switchFormat: typeof switchFormat;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
"color-change": (data: ColorChangeDetail) => any;
"color-copy": (data: ColorChangeDetail) => any;
}, string, PublicProps, Readonly<ColorPickerProps> & Readonly<{
"onColor-change"?: ((data: ColorChangeDetail) => any) | undefined;
"onColor-copy"?: ((data: ColorChangeDetail) => any) | undefined;
}>, {
color: string | default_2;
copy: (cssColor: string) => Promise<void> | void;
id: string;
visibleFormats: ColorFormat[];
defaultFormat: ColorFormat;
alphaChannel: "show" | "hide";
}, {}, {}, {}, string, ComponentProvideOptions, false, {
colorPicker: HTMLDivElement;
colorSpaceRef: HTMLDivElement;
thumb: HTMLDivElement;
}, HTMLDivElement>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'hue-range-input-label'?(_: {}): any;
        'alpha-range-input-label'?(_: {}): any;
        'copy-button'?(_: {}): any;
        actions?(_: {}): any;
        'format-switch-button'?(_: {}): any;
    };
    refs: {
        colorPicker: HTMLDivElement;
        colorSpaceRef: HTMLDivElement;
        thumb: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare type ColorChangeDetail = {
    /**
     * The [colorjs.io `Color` object](https://colorjs.io/docs/the-color-object) representing the currently selected color.
     */
    color: default_2;
    /**
     * The currently selected color as a CSS color string formatted based on the active format.
     */
    cssColor: string;
};

export declare type ColorFormat = 'hex' | 'hsl' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'srgb';

export declare const ColorPicker: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare interface ColorPickerProps {
    /**
     * The initially rendered color.
     */
    color?: string | default_2;
    /**
     * Takes a function that will be used in place of `window.navigator.clipboard.writeText` when triggering the color picker's copy color functionality (programmatically or via the UI).
     */
    copy?: (cssColor: string) => Promise<void> | void;
    /**
     * The prefix for all ID attribute values used by the color picker.
     */
    id?: string;
    /**
     * The list of visible color formats.
     */
    visibleFormats?: ColorFormat[];
    /**
     * The initially visible color format.
     */
    defaultFormat?: ColorFormat;
    /**
     * Controls whether the control related to a color’s alpha channel are rendered in the color picker.
     *
     * The following settings are available:
     *
     * - **show**: Default. The alpha channel range input and the alpha channel value input are rendered.
     * - **hide**: The alpha channel range input and the alpha channel value input are not rendered. The `color-change` event emits a `cssColor` property without the alpha channel part.
     */
    alphaChannel?: 'show' | 'hide';
}

/**
 * Copies the current color (determined by the active color format).
 *
 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
 *
 * Only works in secure browsing contexts (i.e. HTTPS).
 */
declare function copyColor(): Promise<void>;

declare const plugin: Plugin_2;
export default plugin;

/**
 * Sets the next active color format by cycling through the visible color formats.
 */
declare function switchFormat(): void;

export { }
