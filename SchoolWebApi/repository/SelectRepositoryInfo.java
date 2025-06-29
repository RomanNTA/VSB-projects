package cz.sliva.nobodywebapi.repository;

public interface SelectRepositoryInfo {

    int getId();
    String getUuid();
    String getContextName();
    String getComments();
    String getFileName();

    // String getJson();
    String getTypeSrc();
}
