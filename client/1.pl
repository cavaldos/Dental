:-op(150,xfy,likes).
:-op(150,xf,is_female).
:-op(150,xf,isa_cat).
:-op(150,xfy,owns).

john likes X:- X is_female, X owns Y, Y isa_cat.
is_female(mary).
owns(mary,fido).
isa_cat(fido).