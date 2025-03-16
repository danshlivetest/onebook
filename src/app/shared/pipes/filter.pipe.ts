import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], value: string, filterBy: string | string[]): any[] {
    const filterKeys = Array.isArray(filterBy) ? filterBy : [filterBy]

    return items.filter(item => {
      return filterKeys.some(key => {
        return String(item[key]).toLowerCase().includes(value.toLowerCase())
      })
    })
  }
}
