package br.com.andrecaetano.repositorys;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.andrecaetano.models.Task;

@RepositoryRestResource(collectionResourceRel = "task", path = "task")
public interface RepositoryTask extends CrudRepository<Task, Long> {

	List<Task> findByDescricao(@Param("descricao") String descricao);

	
	
}
