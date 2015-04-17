<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">

<jsp:include page="includes/header.jsp"/>

<body>

<%-- <jsp:include page="includes/topmenu.jsp"/> --%>

<div id="mainPanel" class="container">

<div class="row">
    <div class="container-fluid">
        <img class="logo-site" src="/img/company-logo.png" alt="<fmt:message key="pamelaChu.logo"/>">
        <h3 class="text-center title-blue"><fmt:message key="pamelaChu.presentation"/></h3>
    </div>
</div>

<c:if test="${action eq 'register'}">
<div class="alert alert-info">
    <fmt:message key="pamelaChu.register.msg"/>
</div>
</c:if>
<c:if test="${action eq 'registerFailure'}">
<div class="alert alert-danger">
    <fmt:message key="pamelaChu.register.msg.error"/>
</div>
</c:if>
<c:if test="${action eq 'loginFailure'}">
<div class="alert alert-danger">
    <fmt:message key="pamelaChu.authentification.error"/>
</div>
</c:if>
<c:if test="${action eq 'lostPassword'}">
<div class="alert alert-info">
    <fmt:message key="pamelaChu.lost.password.msg"/>
</div>
</c:if>
<c:if test="${action eq 'lostPasswordFailure'}">
<div class="alert alert-danger">
    <fmt:message key="pamelaChu.lost.password.msg.error"/>
</div>
</c:if>
<c:if test="${action eq 'ldapPasswordFailure'}">
<div class="alert alert-danger">
    <fmt:message key="pamelaChu.ldap.password.msg.error"/>
</div>
</c:if>

<div class="row">
    <div class="col-span-6">
        <h4 class="title-blue sub-title-home"><fmt:message key="pamelaChu.register.title"/></h4>

        <p class="text-blue">
            <fmt:message key="pamelaChu.register.text.1"/>
            <fmt:message key="pamelaChu.register.text.2"/>
        </p>
        <form action="/pamelaChu/register" method="post" class="well" accept-charset="utf-8" id="registrationForm">
            <fieldset class="row-fluid">
                <div class="controle-group">
                    <label>
                        <fmt:message key="pamelaChu.login"/> :
                    </label>
                    <input name="email" type="email" required="required" class="col-span-12"
                           placeholder="Your e-mail..."/>
                </div>
                <div class="controle-group">
                    <button type="submit" class="col-span-12 btn btn-blue btn-L" id="registrationButton">
                        <fmt:message key="pamelaChu.register"/>
                    </button>
                </div>
            </fieldset>
        </form>
    </div>

    <div class="col-span-6">
        <h4 class="title-blue sub-title-home"><fmt:message key="pamelaChu.authentification"/></h4>

        <form action="/pamelaChu/authentication" method="post" accept-charset="utf-8" id="loginForm" class="well">
            <fieldset class="row-fluid">
                <div class="controle-group">
                    <label>
                        <fmt:message key="pamelaChu.login"/> :
                    </label>
                    <input id="j_username" name="j_username" type="email" required="required" autofocus
                           class="col-span-12" placeholder="Your e-mail..."/>
                </div>
                <div class="controle-group">
                    <label>
                        <fmt:message key="pamelaChu.password"/> :
                    </label>
                    <input id="j_password" name="j_password" type="password" required="required"
                           class="col-span-12" placeholder="Your password..."/>
                </div>
                <div class="controle-group">
                    <input id="_spring_security_remember_me" name="_spring_security_remember_me"
                           type="checkbox"/>
                    <fmt:message key="pamelaChu.remember.password.time"/>
                </div>
                <div class="controle-group">
                    <button type="submit" class="col-span-12 btn btn-blue btn-L" id="loginButton">
                        <fmt:message key="pamelaChu.authentificate"/>
                    </button>
                </div>

            </fieldset>
        </form>

        <div class="well row-fluid col-span-12">
            <div data-toggle="collapse" data-target="#lostPasswordDiv">
                <button class="col-span-12 btn btn-red btn-L">
                    <fmt:message key="pamelaChu.lost.password.title"/>
                </button>
            </div>
            <div class="col-span-12">
                <div id="lostPasswordDiv" class="collapse little-height">
                    <form action="/pamelaChu/lostpassword" method="post" accept-charset="utf-8">
                        <fieldset>
                            <div class="controle-group">
                                <label class="little-marge-top">
                                    <fmt:message key="pamelaChu.login"/> :
                                </label>
                                <input name="email" type="email" required="required" class="col-span-12"
                                       placeholder="Your e-mail..."/>
                            </div>
                            <div class="controle-group">
                                <button type="submit" class="col-span-12 btn-L btn btn-blue">
                                    <fmt:message key="pamelaChu.lost.password.button"/>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <%-- <div class="col-span-4">
        <h1><fmt:message key="pamelaChu.authentication.google.title"/></h1>

        <p>
            <fmt:message key="pamelaChu.authentication.google.desc.1"/>
        </p>

        <p>
            <a href="http://www.google.com/enterprise/apps/business/">Google Apps for Business</a>
        </p>

        <p>
            <fmt:message key="pamelaChu.authentication.google.desc.2"/>
        </p>

        <p>
            <fmt:message key="pamelaChu.authentication.google.desc.3"/>
        </p>

        <form class="well" action="/pamelaChu/j_spring_openid_security_check" method="post" accept-charset="utf-8">
            <fieldset class="row-fluid">
                <div class="controle-group">
                    <input class="col-span-12" name="openid_identifier" size="50"
                           maxlength="100" type="hidden"
                           value="https://www.google.com/accounts/o8/id"/>
                </div>
                <div class="controle-group">
                    <button id="proceed_google" type="submit" class="col-span-12 btn btn-blue">
                        <fmt:message key="pamelaChu.authentication.google.submit"/>
                    </button>
                </div>
                <div class="controle-group">
                    <div class="text-center">(<a href="/pamelaChu/tos"><fmt:message key="pamelaChu.authentication.cgv"/></a>)
                    </div>
                </div>
            </fieldset>
        </form>
    </div> --%>
</div>

<div id="modalTimeoutWindow" class="modal hide fade">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3><fmt:message key="pamelaChu.login.modal.timeout.title"/></h3>
    </div>
    <div class="modal-body">
        <p><fmt:message key="pamelaChu.login.modal.timeout.message"/></p>
    </div>
    <div class="modal-footer">
        <a href="#" class="btn" data-dismiss="modal" aria-hidden="true"><fmt:message
                key="pamelaChu.login.modal.timeout.close"/></a>
    </div>
</div>
<jsp:include page="includes/footer.jsp"/>

<script type="text/javascript">
    var urlParams = {};
    var actions = new Array({
        name: 'timeout',
        exec: function () {
            $('#modalTimeoutWindow').modal({
                keyboard: true,
                show: true
            });
        }
    });

    $(function () {
        var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) {
                    return decodeURIComponent(s.replace(pl, " "));
                },
                query = window.location.search.substring(1);

        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }

        for (var i = 0; i < actions.length; i++) {
            if (urlParams[actions[i].name] != null) {
                actions[i].exec();
            }
        }
    });
</script>
</body>
</html>
