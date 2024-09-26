import options from "options"
import { Header } from "./widgets/Header"
import { AppMixer, Microphone, SinkSelector, Volume } from "./widgets/Volume"
import { Media } from "./widgets/Media"
import Gtk from "types/@girs/gtk-3.0/gtk-3.0"
import PopupWindow from "widget/PopupWindow"

const { bar, quicksettings } = options
const media = (await Service.import("mpris")).bind("players")

const layout = Utils.derive([bar.position, quicksettings.position], (bar, gs) =>
 `${bar}-${gs}` as const)

const Row = (
    toggles: Array<() => Gtk.Widget> = [],
    menus: Array<() => Gtk.Widget> = [],
) => Widget.Box({
    vertical: true,
    children: [
        Widget.Box({
            homogeneous: true,
            class_name: "row horizontal",
            children: toggles.map(w => w()),
        }),
        ...menus.map(w => w()),
    ]
})

const Settings = () => Widget.Box({
    vertical: true,
    class_name: "quicksettings vertical",
    css: quicksettings.width.bind().as(w => `min-width: ${w}px;`),
    children: [
        Header(),
        Widget.Box({
            class_name: "sliders-box vertical",
            vertical: true,
            children: [
                Row(
                    [Volume],
                    [SinkSelector, AppMixer],
                ),
                Microphone(),
            ],
        }),
        Widget.Box({
            visible: media.as(l => l.length > 0),
            child: Media(),
        }),
    ]
})

const QuickSettings = () => PopupWindow({
    name: "quicksettings",
    exclusivity: "exclusive",
    transition: bar.position.bind().as(pos => pos === "top" ? "slide_down" : "slide_up"),
    layout: layout.value,
    child: Settings(),
})

export function setupQuickSettings() {
    App.addWindow(QuickSettings())
    layout.connect("changed", () => {
        App.removeWindow("quicksettings")
        App.addWindow(QuickSettings())
    })
}

