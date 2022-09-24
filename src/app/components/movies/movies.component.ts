import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from '../../services/movie.service';
import { fromEvent, tap, map, filter, debounceTime, distinct } from 'rxjs';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit {
  constructor(private movieService: MovieService) {}

  movies: Movie[] = [];
  @ViewChild('movieSearchInput') movieSearchInput: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: Event) => {
          const searchTerm = (event.target as HTMLInputElement).value;
          return searchTerm;
        }),
        filter((searchTerm: string) => searchTerm.length > 3),
        debounceTime(1000),
        distinct(),
        tap((searchTerm: string) => {
          console.log(searchTerm);
        })
      )
      .subscribe((searchTerm: string) => {
        this.getMovies(searchTerm);
      });
  }

  getMovies(searchTerm: string) {
    this.movieService.getMovies(searchTerm).subscribe((data) => {
      this.movies = data.Search;
    });
  }
}
