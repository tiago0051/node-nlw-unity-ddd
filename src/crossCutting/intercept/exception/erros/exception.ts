export class Exception extends Error {
  public statusCode: number;
  public errors?: string[];

  constructor(props: {
    errors?: string[];
    statusCode: number;
    message: string;
  }) {
    super(props.message);
    this.statusCode = props.statusCode;
  }
}
