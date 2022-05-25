package fr.iut.nantes.flashme2signal.web.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MaterielNotFoundException extends RuntimeException {
    public MaterielNotFoundException(String s) {
        super(s);
    }
}
