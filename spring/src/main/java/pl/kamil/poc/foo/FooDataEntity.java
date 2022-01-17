package pl.kamil.poc.foo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="foo_data")
public class FooDataEntity {
    @Id()
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Integer id;

    @Column()
    String data;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "foo_id", nullable = false)
    FooEntity foo;
}
