import {
  ActionsSpecGetResponse,
  ActionsSpecPostRequestBody,
  ActionsSpecPostResponse,
  Parameter,
} from './actions-spec';

export class Action {
  private readonly _actions: ActionComponent[];

  private constructor(
    private readonly url: string,
    private readonly data: ActionsSpecGetResponse,
  ) {
    // if no _links present, fallback to original solana pay spec
    if (!data._links?.actions) {
      this._actions = [new ActionComponent(data.label, url)];
      return;
    }

    this._actions = data._links.actions.map((action) => {
      return new ActionComponent(action.label, action.href, action.parameters);
    });
  }

  public get icon() {
    return this.data.icon;
  }

  public get title() {
    return this.data.title;
  }

  public get description() {
    return this.data.description;
  }

  public get disabled() {
    return this.data.disabled ?? false;
  }

  public get actions() {
    return this._actions;
  }

  public resetActions() {
    this._actions.forEach((action) => action.reset());
  }

  static async fetch(apiUrl: string) {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch action ${apiUrl}`);
    }

    const data = (await response.json()) as ActionsSpecGetResponse;

    return new Action(apiUrl, data);
  }
}

export class ActionComponent {
  private parameterValue: string = '';

  constructor(
    private _label: string,
    private _href: string,
    private _parameters?: [Parameter],
  ) {}

  private get href() {
    if (this.parameter) {
      return this._href.replace(
        `{${this.parameter.name}}`,
        this.parameterValue.trim(),
      );
    }

    return this._href;
  }

  public get label() {
    return this._label;
  }

  // initial version uses only one parameter, so using the first one
  public get parameter() {
    const [param] = this._parameters ?? [];

    return param;
  }

  public reset() {
    this.parameterValue = '';
  }

  public setValue(value: string) {
    this.parameterValue = value;
  }

  public async execute(account: string) {
    const response = await fetch(this.href, {
      method: 'POST',
      body: JSON.stringify({ account } as ActionsSpecPostRequestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to execute action ${this.href}, reason: ${error}`,
      );
    }

    const txData = (await response.json()) as ActionsSpecPostResponse;
  }
}
