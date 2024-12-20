import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<ColorPickerProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
"color-change": (data: ColorChangeDetail) => any;
"color-copy": (data: ColorChangeDetail) => any;
}, string, PublicProps, Readonly<ColorPickerProps> & Readonly<{
"onColor-change"?: ((data: ColorChangeDetail) => any) | undefined;
"onColor-copy"?: ((data: ColorChangeDetail) => any) | undefined;
}>, {
id: string;
color: string | ColorHsl | ColorHwb | ColorRgb;
visibleFormats: VisibleColorFormat[];
defaultFormat: VisibleColorFormat;
alphaChannel: AlphaChannelProp;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        "hue-range-input-label"?(_: {}): any;
        "alpha-range-input-label"?(_: {}): any;
        "copy-button"?(_: {}): any;
        "format-switch-button"?(_: {}): any;
    };
    refs: {
        colorPicker: HTMLDivElement;
        colorSpace: HTMLDivElement;
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

export declare type AlphaChannelProp = 'show' | 'hide';

export declare type ColorChangeDetail = {
    colors: ColorMap;
    cssColor: string;
};

export declare type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb';

export declare type ColorHsl = {
    h: number;
    s: number;
    l: number;
    a: number;
};

export declare type ColorHsv = {
    h: number;
    s: number;
    v: number;
    a: number;
};

export declare type ColorHwb = {
    h: number;
    w: number;
    b: number;
    a: number;
};

export declare type ColorMap = {
    hex: string;
    hsl: ColorHsl;
    hsv: ColorHsv;
    hwb: ColorHwb;
    rgb: ColorRgb;
};

export declare const ColorPicker: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare interface ColorPickerProps {
    /**
     * The initially rendered color.
     */
    color?: string | ColorHsl | ColorHwb | ColorRgb;
    /**
     * The prefix for all ID attribute values used by the color picker.
     */
    id?: string;
    /**
     * The list of visible color formats.
     */
    visibleFormats?: VisibleColorFormat[];
    /**
     * The initially visible color format.
     */
    defaultFormat?: VisibleColorFormat;
    /**
     * Controls whether the control related to a color’s alpha channel are rendered in the color picker.
     *
     * The following settings are available:
     *
     * - **show**: Default. The alpha channel range input and the alpha channel value input are rendered.
     * - **hide**: The alpha channel range input and the alpha channel value input are not rendered. The `color-change` event emits a `cssColor` property without the alpha channel part.
     */
    alphaChannel?: AlphaChannelProp;
}

export declare type ColorRgb = {
    r: number;
    g: number;
    b: number;
    a: number;
};

declare const plugin: Plugin_2;
export default plugin;

export declare type VisibleColorFormat = Exclude<ColorFormat, 'hsv'>;

export { }
