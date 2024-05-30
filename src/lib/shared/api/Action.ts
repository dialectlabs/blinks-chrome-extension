import {
  ActionError,
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
    // if no links present, fallback to original solana pay spec
    if (!data.links?.actions) {
      this._actions = [new ActionComponent(data.label, url)];
      return;
    }

    const urlObj = new URL(url);
    this._actions = data.links.actions.map((action) => {
      return new ActionComponent(
        action.label,
        urlObj.origin + action.href,
        action.parameters,
      );
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

  public get error() {
    return this.data.error?.message ?? null;
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

  public async post(account: string) {
    const response = await fetch(this.href, {
      method: 'POST',
      body: JSON.stringify({ account } as ActionsSpecPostRequestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(
        `Failed to execute action ${this.href}, reason: ${error.message}`,
      );

      throw {
        message: error.message,
      } as ActionError;
    }

    return (await response.json()) as ActionsSpecPostResponse;
  }
}
