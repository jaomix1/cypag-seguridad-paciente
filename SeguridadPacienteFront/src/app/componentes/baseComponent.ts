export class BaseFormComponent {
  public latin: RegExp = /^[\wÀ-ú\s,.]+$/;
  public latinExt: RegExp = /^[\wÀ-ú\s,.?¡¿!_-\s*;:]+$/;
  public number: RegExp = /^[0-9]+$/;
  public loadingMain: boolean = false;
  public loading: boolean = false;

}
