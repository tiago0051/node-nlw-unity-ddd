export class ListFilter {
  public pageIndex: number;
  public search: string;
  public take: number;

  constructor(props: Partial<ListFilter>) {
    const { pageIndex, search, take } = props;

    this.pageIndex = pageIndex ?? 0;
    this.search = search;
    this.take = take ?? 10;
  }
}
