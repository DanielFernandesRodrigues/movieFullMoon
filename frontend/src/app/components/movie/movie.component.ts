import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'app/custom-components/custom-html-components/notification/notification-sgee.service';
import { MovieService } from 'app/services/movie.service';
import { IMovie } from 'app/models/movie';
import { ITMDbResult } from 'app/models/tmdb-result';
import { DataTable } from 'primeng/primeng';

@Component({
    templateUrl: './movie.component.html'
})

export class MovieComponent implements OnInit {
    title = 'Movies';
    emptyMsg = 'Nenhum registro encontrado';
    result: ITMDbResult;
    movies: IMovie[] = [];
    displayDialog = false;
    dialogTitle = 'Movie Detail';
    selectedMovie;
    @ViewChild('myCoolTable') myCoolTable: DataTable;


    constructor(private notificationsService: NotificationsService, private movieService: MovieService) {
    }

    ngOnInit(): void {
        this.getMovies(1);
    }

    private getMovies(page: number): void {
        this.notificationsService.showWait();
        this.movieService.getMovies(page)
            .subscribe(result => {
                console.log(result)
                this.resolveSearch.bind(this)(result);
                this.notificationsService.hideWait();
            },
            error => {
                this.notificationsService.hideWait();
                this.myCoolTable.reset();
                if (error.text()) {
                    this.notificationsService.notify('warn', 'Atenção', error.text());
            }
        });
    }

    private resolveSearch(result) {
        this.result = result;
        this.movies = result.results;
    }

    onPage(event) {
        this.getMovies((event.first + 20) / 20);
    }

    getStyle(backdrop_path) {
        return {'background-image': 'url(' + backdrop_path + ')'};
    }

    clickMovie(movie) {
        this.selectedMovie = movie;
        this.displayDialog = true;
    }
}
