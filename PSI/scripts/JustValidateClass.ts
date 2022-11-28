declare class JustValidate {
    constructor(name: string, globalConfig?: {}, dictLocale?: {}[]);
    constructor(name: string);
    showErrors(errors: {});
    addField(selector: string, objects: object[]);
    revalidate();
    //function ajax(url: string, settings?: any): void;
    //const version: number;
    //class Event {
    //    blur(eventType: EventType): void
    //}
    //enum EventType {
    //    CustomClick
    //}
}

//declare var JustValidate: (selector: string) => any;


